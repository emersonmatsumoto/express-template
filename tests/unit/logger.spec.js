const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { expect } = require('chai')
const winston = require('winston')

describe('logger', () => {
  const now = new Date()
  let consoleStub
  let transportStub
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
    consoleStub = sinon.stub()
    transportStub = sinon.stub(winston, 'transports').value({ Console: consoleStub })
    sinon.stub(winston, 'createLogger')
  })

  afterEach(() => {
    clock.restore()
    winston.createLogger.restore()
    transportStub.restore()
  })

  describe('when LOG_LEVEL is set in env', () => {
    it('should create logger with LOG_LEVEL value', () => {
      process.env.LOG_LEVEL = 'info'
      proxyquire('../../src/logger', { 'winston': winston })

      const params = consoleStub.getCalls()[0].args
      const transport = params[0]

      expect(transport.level).to.be.equal('info')
      expect(transport.timestamp()).to.be.equal(now.toISOString())
      expect(transport.stderrLevels).to.be.an('array').that.does.include('error')
      sinon.assert.calledOnce(winston.createLogger)
      sinon.assert.calledWithNew(consoleStub)

      delete process.env.LOG_LEVEL
    })
  })

  describe('when LOG_LEVEL is not set in env', () => {
    it('should create logger with debug level', () => {
      proxyquire('../../src/logger', { 'winston': winston })

      const params = consoleStub.getCalls()[0].args
      const transport = params[0]

      expect(transport.level).to.be.equal('debug')
      expect(transport.timestamp()).to.be.equal(now.toISOString())
      expect(transport.stderrLevels).to.be.an('array').that.does.include('critical')
      sinon.assert.calledOnce(winston.createLogger)
      sinon.assert.calledWithNew(consoleStub)
    })
  })
})

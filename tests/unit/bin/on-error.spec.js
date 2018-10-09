const sinon = require('sinon')
const { expect } = require('chai')
const onError = require('../../../src/bin/on-error')
const logger = require('../../../src/logger')

describe('bin/on-error', () => {
  context('when create handler', () => {
    const onErrorHandler = onError.createHandler(80)

    it('should be return a function', () => {
      expect(typeof (onErrorHandler)).to.be.equal('function')
    })

    it('should throw error when syscall != listen', () => {
      const error = new Error()
      error.syscall = 'listen'
      expect(() => onErrorHandler(error)).to.throw(error)
    })

    it('should throw error when error code is not recognizable', () => {
      const error = new Error()
      expect(() => onErrorHandler(error)).to.throw(error)
    })

    context('when the error code is recognizable', () => {
      beforeEach(() => {
        sinon.stub(process, 'exit')
        sinon.stub(logger, 'error')
      })

      afterEach(() => {
        process.exit.restore()
        logger.error.restore()
      })

      it('should process exit with EACCES code', () => {
        const error = new Error()
        error.code = 'EACCES'
        error.syscall = 'listen'

        onErrorHandler(error)

        sinon.assert.calledWith(logger.error, 'Port 80 requires elevated privileges')
        sinon.assert.calledWith(process.exit, 1)
        sinon.assert.calledOnce(process.exit)
      })

      it('should process exit with EADDRINUSE code', () => {
        const error = new Error()
        error.code = 'EADDRINUSE'
        error.syscall = 'listen'

        onErrorHandler(error)

        sinon.assert.calledWith(logger.error, 'Port 80 is already in use')
        sinon.assert.calledWith(process.exit, 1)
        sinon.assert.calledOnce(process.exit)
      })
    })
  })

  // context('whithout arguments ', () => {
  //   it('should be return a function', () => expect(normalizePort()).to.be.undefined)
  // })
  // context('with NaN value', () => {
  //   it('should return the argument value', () => {
  //     const port = 't23'
  //     expect(normalizePort(port)).to.be.equal(port)
  //   })
  // })
  // context('with')
})

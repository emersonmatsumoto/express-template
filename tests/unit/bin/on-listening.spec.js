const sinon = require('sinon')
const { expect } = require('chai')
const onListening = require('../../../src/bin/on-listening')
const logger = require('../../../src/logger')

describe('bin/on-listening', () => {
  context('when create handler', () => {
    const server = { address: () => { } }
    const onListeningHandler = onListening.createHandler(server)

    beforeEach(() => {
      sinon.stub(server, 'address')
        .callsFake(() => {
          return { port: '80' }
        })
      sinon.stub(logger, 'info')
    })

    afterEach(() => {
      server.address.restore()
      logger.info.restore()
    })

    it('should be return a function', () => {
      expect(typeof (onListeningHandler)).to.be.equal('function')
    })

    it('should call address', () => {
      onListeningHandler()
      sinon.assert.calledOnce(server.address)
    })

    it('should log info', () => {
      onListeningHandler()
      sinon.assert.calledOnce(logger.info)
      sinon.assert.calledWith(logger.info, 'Listening on port 80')
    })
  })
})

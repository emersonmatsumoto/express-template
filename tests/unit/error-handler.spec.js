const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const logger = require('../../src/logger')
const errorHandler = require('../../src/error-handler')
const expect = chai.expect
chai.use(sinonChai)

describe('error-handler', () => {
  describe('when express catch a error', () => {
    it('logger error and send message', () => {
      const err = {
        message: 'Error message',
        stack: 'Stack trace'
      }
      const res = {
        status: sinon.stub(),
        send: sinon.stub()
      }
      sinon.stub(logger, 'error')

      res.status.returns(res)

      errorHandler(err, null, res)

      expect(res.status).to.have.been.calledOnceWith(500)
      expect(res.send).to.have.been.calledOnceWith({ error: err.message })
      expect(logger.error).to.have.been.calledOnceWith(err.message, { stack: err.stack })
    })
  })
})

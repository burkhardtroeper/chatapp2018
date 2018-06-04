var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var user = 'Jen';
        var text = 'Some message';
        var message = generateMessage(user, text);
        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toInclude({
            user,
            text
        });
    });
});
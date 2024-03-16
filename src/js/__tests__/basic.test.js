import CardIdentifier from "../CardIdentifier";

const cardIdentifier = new CardIdentifier();

describe('should find payment system, if card number is correct', () => {
    test.each([
        ['371449635398431', 'amex'],
        ['346519360365268', 'amex'],
        
        ['6011453881559574', 'discover'],
        ['6011678985545521', 'discover'],

        ['4485111551193569', 'visa'],
        ['4388529697885', 'visa'],

        ['3545955630549781', 'jcb'],
        ['356175613241302327', 'jcb'],

        ['2201382000000013', 'mir'],
        ['22033462521784956', 'mir'],

        ['5115182727233360', 'master'],
        ['5506809153279973', 'master'],
    ])(('the number %i belongs to %s payment system'), (input, paymentSystem) => {
        expect(cardIdentifier.identifyCard(input)).toBe(paymentSystem);
    })
})

test('should not find payment system, if card number is incorrect', () => {
    let paymentSystem = cardIdentifier.identifyCard('30569309025904');
    expect(paymentSystem).toBe('undefined');

    paymentSystem = cardIdentifier.identifyCard('82345678912345');
    expect(paymentSystem).toBeUndefined();
})
export default class CardIdentifier {

    detectPaymentSystem(firstDigits) {
        let cardNumber = firstDigits.join('');
        if (cardNumber.startsWith('4')) {
            return 'visa';
        } else if (cardNumber.startsWith('5')) {
            return 'master';
        } else if (cardNumber.startsWith('37') || cardNumber.startsWith('34')) {
            return 'amex';
        } else if (cardNumber.startsWith('6')) {
            return 'discover';
        } else if (cardNumber.startsWith('35')) {
            return 'jcb';
        } else if (cardNumber.startsWith('220')) {
            return 'mir';
        } else {
            return 'undefined';
        }
    }

    isValidNumber(digits) {
        if (digits.length >= 13 && digits.length <= 21) {
            let sum = 0;
            let isSecondDigit = false;
            for (let i = digits.length - 1; i >= 0; i--) {
                let digit = parseInt(digits[i]);
                
                if (isSecondDigit) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                sum += digit;
                isSecondDigit = !isSecondDigit;
            }
            return sum % 10 === 0;
        }
    }

    identifyCard(cardNumber) {
        let digits = [...String(cardNumber)].map(item => +item);

        const result = this.isValidNumber(digits)
        if (result){
            let firstDigits = digits.slice(0, 4);
            let paymentSystem = this.detectPaymentSystem(firstDigits);
            return paymentSystem;
        } else {
            return;
        }
    }
}
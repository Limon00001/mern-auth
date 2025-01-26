/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/25/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import crypto from 'crypto';

// Generate verification Token
function generateCode(length = 6) {
    let code = '';
    while (code.length < length) {
        const num = crypto.randomInt(0, 10);
        code += num.toString();
    }
    return code;
}

// Export
export { generateCode };

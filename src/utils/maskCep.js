export function MasKCep(value) {

    if (!value) return "";

    if (typeof value != 'string') return;

    const digits = value.replace(/\D/g, '');

    const match = digits.match(/^(\d{0,5})(\d{0,3})$/);

    if (!match) return '';

    return match[1] ? `${match[1]}` + (match[2] ? `-${match[2]}` : '') : '';
}
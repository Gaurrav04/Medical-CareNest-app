export function getNormalDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    // Function to get the ordinal suffix for the day
    function getOrdinalSuffix(n: number): string {
        if (n >= 11 && n <= 13) {
            return 'th';
        }
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}


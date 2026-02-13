export function shouldProxyIntoMicroservice() {
    const moviesMigrationPercent = parseInt(process.env.MOVIES_MIGRATION_PERCENT || '0');

    return Math.random() < moviesMigrationPercent / 100;
}

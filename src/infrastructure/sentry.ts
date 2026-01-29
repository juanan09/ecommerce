export const initSentry = () => {
    console.log('Sentry initialized (stub)');
};

export const logError = (error: Error, context?: Record<string, any>) => {
    console.error('Logged to Sentry:', error, context);
};

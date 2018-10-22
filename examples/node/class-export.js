class Self {
    constructor() {
        console.log('====================================');
        console.log('Self invoke class');
        console.log('====================================');
    }
}

module.exports = (
    () => {
        return new Self()
    }
)
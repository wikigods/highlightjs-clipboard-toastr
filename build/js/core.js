class Core {
    constructor(config) {
        this.config = config;
    }

    greet() {
        console.log(`Hello from Corex! Config:`, this.config);
    }
}

// Exporta la clase Core como HCT
export default Core;
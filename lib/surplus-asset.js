const compiler = require('surplus/compiler');
const { Asset } = require('parcel-bundler');

const DepsRegex = require('deps-regex');
const re = new DepsRegex({
  matchInternal: true,
  matchES6: true,
  matchCoffeescript: true
});

const isUsingSurplus = contents => re.getDependencies(contents).find(d => d === 'surplus')

class SurplusAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }

  async generate() {
    let code = this.contents;
    let map;
    if (isUsingSurplus(this.contents)) {
      const compiled = compiler.compile(this.contents, {
        sourcemap: this.options.sourceMaps ? 'extract' : undefined,
        sourcefile: this.relativeName
      });
      code = compiled.src;
      map = this.options.sourceMaps ? compiled.map : undefined;
    }
    
    return [
      {
        type: 'js',
        value: code,
        sourceMap: map ? map : undefined
      }
    ]
  }
}

module.exports = SurplusAsset;
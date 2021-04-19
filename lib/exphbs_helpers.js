exports.header_section = function (name, options) {
    if (!this.content) this.content = {};
    this.content[name] = options.fn(this);
    return null;
};

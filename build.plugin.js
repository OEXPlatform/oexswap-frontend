module.exports = ({  onGetWebpackConfig }) => {
    onGetWebpackConfig((config) => {
      ['scss'].forEach((rule) => {
        if (config.module.rules.get(rule)) {
          config.module
            .rule(rule)
            .use('css-loader')
            .tap((options) => ({
              ...options,
              sourceMap: true
            }));
        }
    });
  })
}
// import { defineConfig } from '@rsbuild/core';
// import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
// import { modules } from './modules';

// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   tools: {
//     rspack: (config, { appendPlugins }) => {
//       // You need to set a unique value that is not equal to other applications
//       config.output!.uniqueName = 'components';
//       appendPlugins([
//         new ModuleFederationPlugin({
//           name: 'components',
//           exposes: modules,
//           shared: ['react', 'react-dom'],
//         }),
//       ]);
//     },
//   },
//   dev: {
//     // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
//     assetPrefix: 'http://localhost:3000',
//   },
//   html: {
//     favicon: './favicon.png',
//     title: 'React, Tailwind and RSBuild Boilerplate',
//   },
// });
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3000,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: 'http://localhost:3000',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // You need to set a unique value that is not equal to other applications
      config.output!.uniqueName = 'federation_provider';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'federation_provider',
          exposes: {
            './button': './source/button.tsx',
          },
          shared: {
            react: {
              eager: true,
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              eager: true,
              singleton: true,
              requiredVersion: false,
            },
          },
        }),
      ]);
    },
  },
  plugins: [pluginReact(), pluginSvgr()],
  html: {
    favicon: './favicon.png',
    title: 'React, Tailwind and RSBuild Boilerplate',
  },
});

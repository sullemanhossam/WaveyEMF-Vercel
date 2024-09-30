import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

// export default defineConfig({
//   server: {
//     port: 2000,
//   },
//   tools: {
//     rspack: (config, { appendPlugins }) => {
//       appendPlugins([
//         new ModuleFederationPlugin({
//           name: 'federation_consumer',
//           remotes: {
//             federation_provider:
//               'federation_provider@http://localhost:3000/mf-manifest.json',
//           },
//           shared: {  'react': {
//               eager: true,
//               singleton: true,
//               requiredVersion: false,
//             },  'react-dom': {
//               eager: true,
//               singleton: true,
//               requiredVersion: false,
//             },],
//         }),
//       });
//     },
//   },
//   plugins: [pluginReact(), pluginSvgr()],
//   html: {
//     favicon: './favicon.png',
//     title: 'React, Tailwind and RSBuild Boilerplate',
//   },
// });

export default defineConfig({
  server: {
    port: 2000, // Your server will run on port 2000
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'federation_consumer',
          remotes: {
            federation_provider:
              'federation_provider@http://localhost:3000/mf-manifest.json',
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
  plugins: [pluginReact(), pluginSvgr()], // Correct usage of the plugins array
  html: {
    favicon: './favicon.png',
    title: 'React, Tailwind, and RSBuild Boilerplate',
  },
});

/// <reference types="@rsbuild/core/types" />

declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

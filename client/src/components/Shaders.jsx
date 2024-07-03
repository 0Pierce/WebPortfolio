export const vertexShader = `
  varying vec3 vPosition;

  void main() {
    vPosition = position;
    gl_PointSize = 5.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;


export const fragmentShader = `
  varying vec3 vPosition;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));
    float glow = 0.05 / distanceToCenter;

    vec3 color = vec3(0.36, 0.04, 0.09);
    gl_FragColor = vec4(color * glow, 0.95);
  }
`;

export default {
    vertexShader,
    fragmentShader,
  };

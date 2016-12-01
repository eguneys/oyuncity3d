uniform sampler2D texture2;
uniform sampler2D texture3;
                
varying vec2 vUv;
        
void main() {
  vec4 image = texture2D(texture2, vUv);
  vec4 mask = texture2D(texture3, vUv);

  gl_FragColor = vec4(image.rgb, mask.a<0.9?1.0:0.0);
}
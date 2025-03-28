precision highp float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x/resolution.y;
    
    float wave = sin(time * 2.0 + uv.x * 10.0) * 0.1;
    vec3 color = vec3(
        fract(uv.x * 50.0 + time),
        fract(uv.y * 30.0 - time),
        sin(time + uv.x * uv.y * 50.0)
    );
    
    gl_FragColor = vec4(color * 0.8 + wave, 1.0);
}
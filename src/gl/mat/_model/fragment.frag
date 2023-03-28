precision highp float;

#include ../glob.glsl

varying vec3 v_normal;
varying vec2 v_uv;
varying vec4 v_color;


void main() {

    // point light
    float ptl = abs(dot(normalize(vec3(1., 1., 1.)), v_normal));


    gl_FragColor.rgb = vec3(ptl);
    gl_FragColor.a = 1.0;
}

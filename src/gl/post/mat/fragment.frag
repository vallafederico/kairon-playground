precision highp float;

#include ../../mat/glob.glsl
// col_green_light
// col_green_dark

uniform float u_time;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
varying vec2 v_uv;
// varying vec2 v_pos;

const vec2 u_tileSize = vec2(10.0, 1.);

void main() {

    vec4 img = texture2D(u_texture, v_uv);
    
    // Calculate the tile index and tile position
    vec2 tileIndex = floor(v_uv * u_resolution / u_tileSize);
    vec2 tilePos = mod(v_uv * u_resolution, u_tileSize) / u_tileSize;
    
    // Calculate the average color of the tile
    vec2 tileCenterUV = (tileIndex * u_tileSize + u_tileSize / 2.0) / u_resolution;
    float avgColor = texture2D(u_texture, tileCenterUV).r;
    // avgColor = step(.5, avgColor);

    // Calculate ellipse radii based on the amount of red in the sampled value
    float minEllipseRadiusX = 0.1; // Set the minimum ellipse x radius value here
    float minEllipseRadiusY = 0.1; // Set the minimum ellipse y radius value here
    float ellipseRadiusX = mix(minEllipseRadiusX, 0.5, avgColor);
    float ellipseRadiusY = .5;
    
    // Draw the ellipse
    vec2 ellipseDist = (tilePos - vec2(0.5)) / vec2(ellipseRadiusX, ellipseRadiusY);
    float ellipseMask = smoothstep(1.0, 1.0 + 0.01, length(ellipseDist));
    
    // Final color
    vec3 final_color = mix(col_green_light, col_green_dark, 1. - ellipseMask);

    
    gl_FragColor.rgb = vec3(final_color);
    gl_FragColor.a = 1.0;
}

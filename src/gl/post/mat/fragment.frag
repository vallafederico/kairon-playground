precision highp float;

#include ../../mat/glob.glsl
// col_green_light
// col_green_dark

uniform float u_time;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
varying vec2 v_uv;
// varying vec2 v_pos;

uniform float u_tile_size_x;
uniform float u_light_limit;
uniform float u_line_thin;
uniform float u_line_large;

// const vec2 TILE_SIZE = vec2(25.0, 1.);
// const float LIGHT_LIMIT = 0.5;
// const float LINE_THIN = 0.05;
// const float LINE_LARGE = .4;



void main() {

    // gui
    vec2 TILE_SIZE = vec2(u_tile_size_x, 1.);
    float LIGHT_LIMIT = u_light_limit;
    float LINE_THIN = u_line_thin;
    float LINE_LARGE = u_line_large;
    // -- 

    vec4 img = texture2D(u_texture, v_uv);
    
    // Calculate the tile index and tile position
    vec2 tileIndex = floor(v_uv * u_resolution / TILE_SIZE);
    vec2 tilePos = mod(v_uv * u_resolution, TILE_SIZE) / TILE_SIZE;
    
    // Calculate the average color of the tile
    vec2 tileCenterUV = (tileIndex * TILE_SIZE + TILE_SIZE / 2.0) / u_resolution;
    float avgColor = texture2D(u_texture, tileCenterUV).r;
    avgColor = step(LIGHT_LIMIT, avgColor);

    // Calculate ellipse radii based on the amount of red in the sampled value
    float minEllipseRadiusX = LINE_THIN; // Set the minimum ellipse x radius value here
    float minEllipseRadiusY = 0.1; // Set the minimum ellipse y radius value here
    float ellipseRadiusX = mix(minEllipseRadiusX, LINE_LARGE, avgColor);
    float ellipseRadiusY = .5;
    
    // Draw the ellipse
    vec2 ellipseDist = (tilePos - vec2(0.5)) / vec2(ellipseRadiusX, ellipseRadiusY);
    float ellipseMask = smoothstep(1.0, 1.0 + 0.01, length(ellipseDist));
    
    // Final color
    vec3 final_color = mix(col_green_light, col_green_dark, 1. - ellipseMask);

    
    gl_FragColor.rgb = vec3(final_color);
    gl_FragColor.a = 1.0;
}

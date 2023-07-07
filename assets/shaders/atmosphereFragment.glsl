varying vec3 vertexNormal;

void main(){
    float intensity = pow(0.7 - dot(vertexNormal, vec3(0,0,1.0)),2.0);
    gl_FragColor = vec4(0.3f, 0.6f, 1.0f, 1.0f) * intensity;
    // gl_FragColor = vec4(0.392f, 0.914f, 0.929f, 1.0f) * intensity;
}
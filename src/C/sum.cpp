#include <stdio.h>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif

EMSCRIPTEN_KEEPALIVE
int sum(int a, int b)
{
    return a + b;
}
#ifdef __cplusplus
}
#endif

int main() 
{
    printf("%d\n", sum(1, 2));
    return 0;
}
#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif
    int pos[4][2] = {{0,0}, {0,0}, {0,0}, {0,0}};

    void moveRight(int id) 
    {
        pos[id][0]++;
    }

    void moveLeft(int id)
    {
        pos[id][0]--;
    }

    void moveUp(int id)
    {
        pos[id][1]++;
    }

    void moveDown(int id)
    {
        pos[id][1]--;
    }

    void (*table[4])(int id) = {
        moveRight,
        moveLeft,
        moveUp,
        moveDown
    };

    void run()
    {
        for(int i = 0; i < 0; i++)
        {
            table[i](i);
        }
    }

#ifdef __cplusplus
}
#endif

int main()
{
    printf("hello world!");
}
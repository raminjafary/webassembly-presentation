(module
    (table (export "table") 4 funcref)
    (type $movefun (func (param i32)))
    (elem (i32.const 0) $moveRight $moveLeft $moveUp $moveDown)
    (memory $0 1)
    (data (i32.const 0) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
    (export "memory" (memory $0))
    (export "moveRight" (func $moveRight))
    (export "moveLeft" (func $moveLeft))
    (export "moveUp" (func $moveUp))
    (export "moveDown" (func $moveDown))
    (export "loop" (func $loop))

    (func $moveRight (param $0 i32)
        ;;; int offset
        (local $offset i32)
        (local.set $offset (i32.mul (local.get $0) (i32.const 8)))
        (i32.store (local.get $offset)
                   (i32.add (i32.load (local.get $offset))(i32.const 1))))

    (func $moveLeft (param $0 i32)
        ;;; int offset
        (local $offset i32)
        (local.set $offset (i32.mul (local.get $0) (i32.const 8)))
        (i32.store (local.get $offset)
                   (i32.sub (i32.load (local.get $offset))(i32.const 1))))

    (func $moveUp (param $0 i32)
        ;;; int offset
        (local $offset i32)
        (local.set $offset (i32.add (i32.mul (local.get $0) (i32.const 8)) (i32.const 4)))
        (i32.store (local.get $offset)
                   (i32.add (i32.load (local.get $offset)) (i32.const 1))))

    (func $moveDown (param $0 i32)
        ;;; int offset
        (local $offset i32)
        (local.set $offset (i32.add (i32.mul (local.get $0) (i32.const 8)) (i32.const 4)))
        (i32.store (local.get $offset)
                   (i32.sub (i32.load (local.get $offset)) (i32.const 1))))

    (func $loop 
        (local $index i32)
        (local.set $index (i32.const 0))
        (loop $break
            (call_indirect (type $movefun) (local.get $index) (local.get $index))
            (local.set $index (i32.add (local.get $index) (i32.const 1)))
            (br_if $break (i32.ne (local.get $index (i32.const 4))))
        ))
)
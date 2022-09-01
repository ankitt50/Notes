/*
JS: high level, prototype based, OOP, multi-paradigm, interpreted / JIT compliled,
    dynamic, single-threaded, garbage-collected.

    first-class fns,
    non-blocking event loop concurrency model


    JS Engine (ex:v8 used by Chrome and nodejs) : program that executes JS code.
    JS Engine's components : Call Stack, and Heap.
                             Call stack is where the code is executed. It consists of execution contexts.
                             Heap is where objects needed by our program are stored (unstructured memory).

    Compilation : entire source code converted to m/c code at once and written to binar file.

                    source code ---Compilation---> m/c code ---Execution---> program running

                    ** execution can happen way after compilation.
    
    Interpretation : interpretor runs through the source code line-by-line and executes it.
                     FYI, code still needs to be converted to m/c code.

    JIT Compilation : Entire code is converted to m/c code at once and executed immediately 
                      (instead of writing the m/c code in a portable file.)
                      Modern JS uses JIT, but earlier it used interpretation.

    Steps of JIT compilation followed in JS engines :
        Parsing (converted into tree/Abstract Syntax Trees(AST))
                
                |
                |
                |
                V
                
        Compilation (AST converted to m/c code) <-------------------
                                                                    |                         
                |                                                   |
                |                                                   |
                |                                                optimisation (happens along
                |                                                    with execution)
                V                                                   |
                                                                    |
        Execution (happens in call stack) ------------------------->

            ** All these steps use separate special threads that we can't access in out code.

    
    JS runtime (ex: browsers) : contains everything required to use JS.
                                ex: JS engine, Web APis, call back queue.

*/

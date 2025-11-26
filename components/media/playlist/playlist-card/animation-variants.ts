'use client'



export const containerVariants = {
    hidden : {
        
        transition: {
            duration: 0.3,
            staggerChildren : 0.08,
            ease: [0.4, 0, 0.2, 1] ,
            when : 'afterChildren'
        }
    }, 
    visible : {
        opacity : 1 ,
        transition: {
            duration: 0.3,
            staggerChildren: 0.08,
            when: "beforeChildren",
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    exit : {
        transition: {
            duration: 0.3,
            staggerChildren: 0.08,
            delay : 3 ,
             when : 'afterChildren',
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

export const mediaSectionVariants = {
    hidden : {
        y : '-100%' ,
        opacity: 0,
        transition : {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] 
        }
    } ,
    visible : {
        y : 0 ,
        opacity: 1,
        transition : {
            duration: 0.4,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    exit: {
        y : '-100%' ,
        opacity: 0,
        transition : {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

//for extra buttons in x translate
export const extraButtonsSectionVariants = {
    hidden : {
        x : '-100%' ,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] 
        },
    } ,
    visible : {
        x : -62 ,
        transition: {
            duration: 0.5,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        },
    },
    hovered : {
        x : 0 ,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] 
        },
    }
} as any

export const YesAndNoButtonVaraiants = {
    hidden : {
        x : '100%' ,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] 
        },
    } ,
    visible : {
        x : 0 ,
        transition: {
            duration: 0.5,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        },
    },
    editHovered : {
        x : -59 ,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] 
        },
    } ,
    deleteHovered : {
        x : -29 ,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] 
        },
    }
} as any


export const closeButtonVariant = {
    hidden : {
        rotate : 180 , 
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        rotate : 0 , 
        transition : {
            duration : 0.2,
            delay: 0.4
        }
    } ,
    exit : {
        rotate : 180 , 
        transition : {
            duration : 0.2,
        }
    }

}

export const deleteButtonVariants = {
    selected : {
        backgroundColor : 'red'
    }, 
    normal : {
        backgroundColor : 'white'
    }
}
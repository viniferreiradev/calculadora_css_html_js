const calculate = document.querySelector('.calculate')
const keys = document.querySelector('.keywords__calculate')


keys.addEventListener('click', e =>{
    if (e.target.matches('button')){

        const key = e.target
        const action = key.dataset.action
        
        if(!action){
            console.log('number key')
        }
        
        if(
            action === 'add' ||
            action === 'substract' ||
            action === 'multiple' ||
            action === 'divide'
        ){
            console.log('operation key!')
        }

    }
})

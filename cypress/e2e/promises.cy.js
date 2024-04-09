const getSomething = callback => {
    setTimeout(() =>{
        callback (11);
    }, 1000)

}


const system = () => {
    console.log('init');
    getSomething(some => console.log('Something is  ${some} '));
    console.log('end')
}

system()
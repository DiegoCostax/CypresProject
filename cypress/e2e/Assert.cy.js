// eslint-disable-next-line no-undef
it('Equality', ()=>{
    const a = 1
   
    // eslint-disable-next-line no-undef
    expect(a).equal(1)
    // eslint-disable-next-line no-undef
    expect(a, 'Deveria ser 1').equal(1)
    // eslint-disable-next-line no-undef
    expect(a).to.equal(1)
})

// eslint-disable-next-line no-undef
it('Truthy', () =>{
    const a = true
    const b = null
    let c
   
    // eslint-disable-next-line no-undef
    expect(a).to.be.true
    // eslint-disable-next-line no-undef
    expect(true).to.be.true
    // eslint-disable-next-line no-undef
    expect(b).to.be.null
    // eslint-disable-next-line no-undef
    expect(a).to.be.not.null
    // eslint-disable-next-line no-undef
    expect(c).to.be.undefined
})

// eslint-disable-next-line no-undef
it('Object Quality', ()=>{
    // eslint-disable-next-line no-undef
    const obj = { 
        a:1, 
        b:2
    }
    // eslint-disable-next-line no-undef
    expect(obj).equal(obj)
    // eslint-disable-next-line no-undef
    expect(obj).equal(obj)
    // eslint-disable-next-line no-undef
    expect(obj).eq(obj)
    // eslint-disable-next-line no-undef
    expect(obj).to.be.equal(obj)
    // eslint-disable-next-line no-undef
    expect(obj).to.be.deep.equal({a:1,b:2})
    // eslint-disable-next-line no-undef
    expect(obj).eql({a: 1, b: 2})
    // eslint-disable-next-line no-undef
    expect(obj).include({a: 1})
    // eslint-disable-next-line no-undef
    expect(obj).have.property('b')
    // eslint-disable-next-line no-undef
    expect(obj).have.property('b',2)
    // eslint-disable-next-line no-undef
    expect(obj).to.not.be.empty
})

// eslint-disable-next-line no-undef
it('Arrays', ()=>{
    const arr = [1, 2, 3]
    // eslint-disable-next-line no-undef
    expect(arr).to.not.be.empty
})

// eslint-disable-next-line no-undef
it('Types', ()=>{
    // eslint-disable-next-line no-undef
    const num = 1
    // eslint-disable-next-line no-undef
    const str = 'String'
    // eslint-disable-next-line no-undef
    expect(num).to.be.a('number')
    // eslint-disable-next-line no-undef
    expect(str).to.be.a('string')   
})

// eslint-disable-next-line no-undef
it('String', () => {
    // eslint-disable-next-line no-undef
    const str = 'String de teste'
    // eslint-disable-next-line no-undef
    expect(str).to.be.equal('String de teste')
    // eslint-disable-next-line no-undef
    expect(str).to.have.length(15)
    // eslint-disable-next-line no-undef
    expect(str).to.contains('de')    

})
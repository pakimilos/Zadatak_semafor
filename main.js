(function() {
    let rndnum = 0;
    const arrayLength = 8;
    let array = [];
    let binaryValue;

    setInterval(() => {
        makeRequest();
    }, 1000);

    function makeRequest() {
        let xmlHttp = new XMLHttpRequest();
        const theUrl = "https://cors-anywhere.herokuapp.com/https://csrng.net/csrng/csrng.php?min=0&max=255";

        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
                const response = JSON.parse(xmlHttp.responseText);
                console.log("response arrived", response[0]);
                console.log("response arrived", response);
                rndnum = response[0].random;
                
                binaryValue = toBinary(rndnum);

                if(Array.from(binaryValue).length === arrayLength){
                    Array.from(binaryValue).forEach((item, index) => {
                        assingCssClassToElement(item, index);
                        return array.push(item);
                    })
                    array = [];
                }
                else {
                    const numericDiffrence = arrayLength - Array.from(binaryValue).length;
                    for(i = 0; i <= numericDiffrence; i++) {
                        if(array.length <= numericDiffrence){
                            i++;
                            array.unshift('0');

                        }
                    }
                    let binaryArray = Array.from(binaryValue);
                    binaryArray = array.concat(binaryArray);
                    binaryArray.forEach((item, index) => {
                        assingCssClassToElement(item, index)
                        return array.push(item);
                    });

                    array = [];
                }
            }

        }
        xmlHttp.addEventListener("loadend", loadEnd);
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send();
    }

    // triggers when request is finished
    function loadEnd() {
        console.log('loadEnd');
        assignWaitPropertyToElement()
    }

    function toBinary(number) {
        let result = [];
        let i;
        for(i = number; i > 0; i = parseInt(i / 2)) {
            result.push(i % 2);
        }
        return result.reverse().join("");
    }

    function assingCssClassToElement(item, index) {
        const circleElements = document.querySelectorAll('.circle');
        if(item === '0'){
            if(circleElements[index]){
                circleElements[index].classList.remove('green');
                circleElements[index].classList.remove('yellow');
                circleElements[index].classList.add('red');
            }
        }
        else if(item === '1'){
            if(circleElements[index]){
                circleElements[index].classList.remove('red');
                circleElements[index].classList.remove('yellow');
                circleElements[index].classList.add('green');
            }
        }
    }

    function assignWaitPropertyToElement() {
        setTimeout(() => {
            const circleElements = document.querySelectorAll('.circle');
            Array.from(circleElements).forEach(circleElement => {
                circleElement.classList.remove('red');
                circleElement.classList.remove('green');
                circleElement.classList.add('yellow');
            })
        }, 600)
    }

})
();

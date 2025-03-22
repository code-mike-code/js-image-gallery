const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider'; 

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });
        
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
        navNext.addEventListener('click', function(e) {
            fireCustomEvent(navNext, 'js-slider-img-next')
            e.stopPropagation()

        })
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
        navPrev.addEventListener('click', function(e) {
            fireCustomEvent(navPrev, 'js-slider-img-prev')
            e.stopPropagation()

        })
    
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
        zoom.addEventListener('click', function(e) {
            fireCustomEvent(zoom, 'js-slider-close')
        })    
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany


    sliderRootElement.classList.add('js-slider--active')
    const clickedImage = event.target.querySelector('img')
    const imageSrc = clickedImage.src

    const sliderImage = document.querySelector('.js-slider__image')
    sliderImage.src = imageSrc

    startAutoSlide(sliderRootElement)

    const groupName = event.target.dataset.sliderGroupName
    const thumbListImages = document.querySelectorAll(imagesSelector)


    const thumbContainer = sliderRootElement.querySelector('.js-slider__thumbs')
    const prototypeThumb = thumbContainer.querySelector('.js-slider__thumbs-item--prototype')

    thumbContainer.innerHTML = ''
    thumbContainer.appendChild(prototypeThumb)

    thumbListImages.forEach( function(thumb) {
        if (thumb.dataset.sliderGroupName === groupName) {
            const newThumb = prototypeThumb.cloneNode(true)
            newThumb.classList.remove('js-slider__thumbs-item--prototype')
            newThumb.querySelector('img').src = thumb.querySelector('img').src

        if (thumb === event.target) {
            newThumb.querySelector('img').classList.add('js-slider__thumbs-image--current')
            }

            thumbContainer.appendChild(newThumb)
        }
   })

    const navNext = sliderRootElement.querySelector('.js-slider__nav--next')
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev')

    navNext.addEventListener('click', stopAutoSlide)
    navPrev.addEventListener('click', stopAutoSlide)


}

const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]

    // const currentThumb = this.querySelector('.js-slider__thumbs-image--current')
    // const nextThumb = currentThumb.closest('.js-slider__thumbs-item').nextElementSibling

    // if(nextThumb && !nextThumb.classList.contains('js-slider__thumbs-item--prototype')) {
    //     currentThumb.classList.remove('js-slider__thumbs-image--current')
    //     nextThumb.querySelector('img').classList.add('js-slider__thumbs-image--current')

    //     const sliderImage = this.querySelector('.js-slider__image')
    //     sliderImage.src = nextThumb.querySelector('img').src

    // }

    const currentThumb = this.querySelector('.js-slider__thumbs-image--current');
    let nextThumb = currentThumb.parentElement.nextElementSibling;

    if (!nextThumb || nextThumb.classList.contains('js-slider__thumbs-item--prototype')) {
        nextThumb = this.querySelector('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)'); // Pierwszy element
    }

    if (nextThumb) {
        currentThumb.classList.remove('js-slider__thumbs-image--current');
        const newImage = nextThumb.querySelector('img');
        newImage.classList.add('js-slider__thumbs-image--current');
        this.querySelector('.js-slider__image').src = newImage.src;
    }
}

const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut [src] dla [.js-slider__image]

    
    // const currentThumb = this.querySelector('.js-slider__thumbs-image--current')
    // const prevThumb = currentThumb.closest('.js-slider__thumbs-item').previousElementSibling;

    // if (prevThumb && !prevThumb.classList.contains('js-slider__thumbs-item--prototype')) {
    //     currentThumb.classList.remove('js-slider__thumbs-image--current')
    //     prevThumb.querySelector('img').classList.add('js-slider__thumbs-image--current')

    //     const sliderImage = this.querySelector('.js-slider__image')
    //     sliderImage.src = prevThumb.querySelector('img').src
    // }


    const currentThumb = this.querySelector('.js-slider__thumbs-image--current');
    let prevThumb = currentThumb.parentElement.previousElementSibling;

    if (!prevThumb || prevThumb.classList.contains('js-slider__thumbs-item--prototype')) {
        const thumbs = this.querySelectorAll('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)');
        prevThumb = thumbs[thumbs.length - 1]; // Ostatni element
    }

    if (prevThumb) {
        currentThumb.classList.remove('js-slider__thumbs-image--current');
        const newImage = prevThumb.querySelector('img');
        newImage.classList.add('js-slider__thumbs-image--current');
        this.querySelector('.js-slider__image').src = newImage.src;
    }



}

const onClose = function(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
    this.classList.remove('js-slider--active')

    stopAutoSlide()

    const thumbsContainer = this.querySelector('.js-slider__thumbs')
    const prototypeThumb = thumbsContainer.querySelector('.js-slider__thumbs-item--prototype')

    thumbsContainer.innerHTML = ''
    thumbsContainer.appendChild(prototypeThumb)
}

let autoSlideInterval

const startAutoSlide = function(sliderRootElement, intervalTime = 3000) {
    stopAutoSlide()
    autoSlideInterval = setInterval(() => {
        fireCustomEvent(sliderRootElement, 'js-slider-img-next')
    }, intervalTime)
}

const stopAutoSlide = function() {
    clearInterval(autoSlideInterval);
}



import testimonies from "../constants/testimoniesData.json"

function testimonialRandomizer() {

    const testimoniesWithSortingKey = testimonies.map(testimony => ({testimony, sortingKey: Math.random()}));
    const shuffledTestimonies = testimoniesWithSortingKey.sort((a, b) => a.sortingKey - b.sortingKey);
    return shuffledTestimonies.map(({testimony}) => testimony);

}

export default testimonialRandomizer;
function randomFlatteringSentence(place) {

    const moment = new Date;
    const number = +(moment.getTime().toString().slice(-1));

    switch (number) {
        case 1:
            return `We've heard great things about ${place}!`;
            break;
        case 2:
            if (place === "Earth") {
                return `The weather must be lovely on ${place}!`;
            } else {
                return `The weather must be lovely in ${place}!`;
            }
            break;
        case 3:
            return `You haven't lived until you've visited ${place}!`;
            break;
        case 4:
            if (place === "Earth") {
                return `Nothing but sunshine and rainbows on ${place}!`;
            } else {
                return `Nothing but sunshine and rainbows in ${place}!`;
            }
            break;
        case 5:
            return `Visiting ${place} is high on our bucketlist!`;
            break;
        case 6:
            if (place === "Earth") {
                return `You are lucky to be on ${place}! We're a tad jealous.`;
            } else {
                return `You are lucky to be in ${place}! We're a tad jealous.`;
            }
            break;
        case 7:
            return `We've been to ${place} once. Nothing but pleasant experiences!`;
            break;
        case 8:
            return `When we think of beautiful seas and landscapes, we think of ${place}!`;
            break;
        case 9:
            if (place === "Earth") {
                return `The best fishing trip we've ever had was on ${place}!`;
            } else {
                return `The best fishing trip we've ever had was in ${place}!`;
            }
            break;
        case 0:
            return `Once it's time for us to retire, you bet we are moving to ${place}!`;
            break;
    }
}

export default randomFlatteringSentence;
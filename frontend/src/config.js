const env = process.env.REACT_APP_ENV;

let url = "http://localhost:8000";

if (env === 'test') {
    url = "http://localhost:8010";
}

if (env === 'production') {
    url = 'http://198.211.125.161:8000'
}

export const apiURL = {
    url,
};

export default {
    notification: {
        type: "default",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    }
}
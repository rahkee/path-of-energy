const content = [
    {
        image: 'images/ball.jpg',
        imageAltText: 'Image of a bowling ball, sitting on a shelf.',
        imageText: 'A bowling ball sits high on a shelf.',
        question: 'What type of energy does the bowling ball have?',
        options: [
            'potential energy',
            'kinetic energy',
            'light energy',
            'sound energy',
        ],
        selectedOption: null,
        answer: 'potential energy',
        feedback:
            'Objects can have energy because of their position. Objects moved to a higher location gain <span class="underline">potential energy</span>.',
        hasAnswered: false,
        isCorrect: false,
    },
    {
        image: 'images/girl.jpg',
        imageAltText:
            'Image of a girl, moving the bowling  ball to a high shelf.',
        imageText:
            'The girl lifted the bowling ball to put it high on the shelf.',
        question:
            'Objects that are moving have a certain type of energy. What is it?',
        options: [
            'kinetic energy',
            'light energy',
            'thermal energy',
            'potential energy',
        ],
        selectedOption: null,
        answer: 'kinetic energy',
        feedback:
            'Objects that are moving have <span class="underline">kinetic energy</span>. Large objects or fast moving objects have lots of kinetic energy.',
        hasAnswered: false,
        isCorrect: false,
    },
    {
        image: 'images/burger.jpg',
        imageAltText: 'Image of a hamburger.',
        imageText:
            'The girl got the energy to lift the bowling ball from the food she eats.',
        question: ' What type of energy is she getting from the food?',
        options: [
            'chemical energy',
            'kinetic energy',
            'light energy',
            'thermal energy',
        ],
        selectedOption: null,
        answer: 'chemical energy',
        feedback:
            'Substances in food contain <span class="underline">chemical energy</span>. This energy can be turned into kinetic energy by our bodies, allowing us to move or to move other things.',
        hasAnswered: false,
        isCorrect: false,
    },
    {
        image: 'images/cow.jpg',
        imageAltText: 'Image of a cow.',
        imageText:
            'Animals that we use for food store energy in the matter that makes up their bodies.',
        question: 'What type of energy is this?',
        options: [
            'chemical energy',
            'kinetic energy',
            'light energy',
            'thermal energy',
        ],
        selectedOption: null,
        answer: 'chemical energy',
        feedback:
            'The substances that make up our bodies contain <span class="underline">chemical energy</span>. This is one reason we eat parts of plants and animals. They provide us with an energy source we can use.',
        hasAnswered: false,
        isCorrect: false,
    },
    {
        image: 'images/grass.jpg',
        imageAltText: 'Image of a grass knoll.',
        imageText: 'A cow eats grass for food.',
        question: 'What type of energy is the cow getting from the grass?',
        options: [
            'chemical energy',
            'kinetic energy',
            'light energy',
            'thermal energy',
        ],
        selectedOption: null,
        answer: 'chemical energy',
        feedback:
            'The substances that make up plants contain <span class="underline">chemical energy</span>. That is why animals can use plants for food.',
        hasAnswered: false,
        isCorrect: false,
    },
    {
        image: 'images/sun.jpg',
        imageAltText: 'Image of the sun.',
        imageText: null,
        question: 'Where did the chemical energy in plants come from?',
        options: [
            'kinetic energy',
            'light energy',
            'sound energy',
            'thermal energy',
        ],
        selectedOption: null,
        answer: 'light energy',
        feedback:
            'Light is a form of energy. <span class="underline">Light energy</span> reaches Earth. Plants change some of this energy into chemical energy. This light energy continually changes forms and is the original source for many of the types of energy we find in our daily lives.',
        hasAnswered: false,
        isCorrect: false,
    },
];

class Index extends React.Component {
    state = {
        activityData: [],
        correctTotal: 0,
        hasAnsweredTotal: 0,
    };

    componentDidMount() {
        let shuffledOptions = [];

        let shuffledContent = content.map(item => {
            shuffledOptions = this.shuffleIt(item.options);

            item.options = shuffledOptions;

            return item;
        });

        this.setState({
            activityData: JSON.parse(JSON.stringify(shuffledContent)),
        });
    }

    shuffleIt = a => {
        let shuffleCopy = [...a];
        var j, x, i;

        for (i = shuffleCopy.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = shuffleCopy[i];
            shuffleCopy[i] = shuffleCopy[j];
            shuffleCopy[j] = x;
        }

        return shuffleCopy;
    };

    selectAnswer(option, index) {
        let newActivityData = this.state.activityData;

        newActivityData[index].hasAnswered = false;
        newActivityData[index].selectedOption = option;

        this.setState({
            activityData: newActivityData,
        });
    }

    validateAnswer(index) {
        let newActivityData = this.state.activityData;
        let selectedOption = newActivityData[index].selectedOption;
        let correctAnswer = newActivityData[index].answer;

        newActivityData[index].hasAnswered = true;

        if (selectedOption === correctAnswer) {
            newActivityData[index].isCorrect = true;
        }

        this.setState(prevState => {
            return {
                activityData: newActivityData,
                correctTotal:
                    selectedOption === correctAnswer
                        ? prevState.correctTotal + 1
                        : prevState.correctTotal,
                hasAnsweredTotal:
                    selectedOption === correctAnswer
                        ? prevState.hasAnsweredTotal + 1
                        : prevState.correctTotal,
            };
        });
    }

    resetGame() {
        this.setState({
            activityData: JSON.parse(JSON.stringify(content)),
            correctTotal: 0,
            hasAnsweredTotal: 0,
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="follow-header">
                    <h1>Path of Energy</h1>
                </div>

                <header>
                    <div className="intro">
                        <h1>
                            Path <span>of</span> Energy
                        </h1>
                        <p>Which type of energy best fits each situation?</p>
                    </div>

                    <div className="lets-begin">
                        <div className="word-arrow">
                            <h3>Scroll right!</h3>
                            <img src="images/small-arrow.png" alt="" />
                        </div>
                    </div>
                </header>

                {this.state.activityData.map((item, moduleIndex) => {
                    return (
                        <React.Fragment key={moduleIndex}>
                            <section
                                className={`module ${
                                    item.isCorrect ||
                                    this.state.hasAnsweredTotal !== moduleIndex
                                        ? 'lock'
                                        : ''
                                }`}
                            >
                                <img src={item.image} alt={item.imageAltText} />

                                {item.imageText ? (
                                    <p className="image-text">
                                        {item.imageText}
                                    </p>
                                ) : (
                                    ''
                                )}

                                <p className="question">{item.question}</p>

                                <div className="dropdown">
                                    <div className="current-selection">
                                        {item.selectedOption
                                            ? item.selectedOption
                                            : 'Select an answer...'}

                                        <img
                                            src="images/dropdown_arrow.png"
                                            alt=""
                                        />
                                    </div>

                                    <ul>
                                        {item.options.map(
                                            (option, optionIndex) => {
                                                return (
                                                    <li
                                                        className={
                                                            item.selectedOption ===
                                                            option
                                                                ? 'selected'
                                                                : ''
                                                        }
                                                        key={optionIndex}
                                                        onClick={() =>
                                                            this.selectAnswer(
                                                                option,
                                                                moduleIndex
                                                            )
                                                        }
                                                    >
                                                        {option}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>

                                    <img
                                        className={`icon ${
                                            item.hasAnswered ? '' : 'hide-icon'
                                        }`}
                                        src={
                                            item.isCorrect
                                                ? 'images/check_correct.png'
                                                : 'images/x_incorrect.png'
                                        }
                                        alt=""
                                    />
                                </div>

                                <div
                                    className={`check-button ${
                                        item.isCorrect ? 'hide' : ''
                                    }`}
                                >
                                    <button
                                        onClick={() =>
                                            this.validateAnswer(moduleIndex)
                                        }
                                        title="Check button"
                                    >
                                        Check
                                    </button>
                                </div>

                                <div
                                    className={`feedback ${
                                        item.hasAnswered ? '' : 'hide-feedback'
                                    } ${
                                        item.isCorrect
                                            ? 'feedback-correct'
                                            : 'feedback-incorrect'
                                    }`}
                                >
                                    <p className="feedback-heading">
                                        <strong>
                                            {item.isCorrect
                                                ? 'Correct'
                                                : 'Incorrect'}
                                        </strong>
                                    </p>
                                    <p
                                        className="feedback-text"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feedback,
                                        }}
                                    ></p>
                                </div>
                            </section>

                            {moduleIndex ===
                            this.state.activityData.length - 1 ? (
                                ''
                            ) : (
                                <div className="energy-direction-arrow">
                                    <img
                                        src="images/path_of_energy_arrow.png"
                                        alt=""
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                <footer
                    className={
                        this.state.hasAnsweredTotal ===
                        this.state.activityData.length
                            ? 'show-footer'
                            : ''
                    }
                >
                    <img src="images/star.png" alt="" />

                    <h1>Activity Complete!</h1>

                    <button
                        className="btn-reset"
                        onClick={() => this.resetGame()}
                    >
                        Reset
                    </button>
                </footer>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

const mainWindow = document.querySelector('#root');

mainWindow.addEventListener('scroll', e => {
    if (
        e.target.scrollLeft >= 400 &&
        !mainWindow.classList.contains('load-header')
    ) {
        mainWindow.classList.add('load-header');
    } else if (e.target.scrollLeft < 400) {
        mainWindow.classList.remove('load-header');
    }
});

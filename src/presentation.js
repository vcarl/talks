// Import React
import React from "react";

// Import Spectacle Core tags
import {
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  List,
  ListItem,
  Notes,
  Slide,
  Text,
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "#EEEEEE",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE",
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica",
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme} contentWidth={1300} contentHeight={900}>
        <Slide textColor="secondary">
          <Heading size={1} caps>
            Overly Defensive
          </Heading>
          <Heading size={1} caps>
            Programming
          </Heading>
          <Heading size={4}>Carl Vitullo</Heading>
          <Heading size={4}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://join.reactiflux.com/"
            >
              vcarl#7694
            </a>
          </Heading>
          <Heading size={4}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mobile.twitter.com/cvitullo"
            >
              @cvitullo
            </a>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={1}>Who am I?</Heading>
          <Text>Lead Moderator of Reactiflux</Text>
          <Text>Senior Frontend Engineer at InRhythm</Text>
          <Text textSize="1rem">(we're always hiring)</Text>
          <Text>I write code at American Express</Text>
          <Notes>
            A lot of this is going to be presented from the perspective of
            React, but other than prop types, nothing in it is React-specific.
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1}>InRhythm</Heading>
          <Text textSize="1.5rem">
            InRhythm is a modern technology consultancy firm that helps
            companies build high-performing innovative digital centers of
            excellence and helps them bring their most critical products to
            market with velocity, quality and impact by applying Silicon Valley
            tools, methods and innovation for their needs.
          </Text>
          <Image src="https://i.imgur.com/vuW1KAC.png" />
          <Notes>
            <p>InRhythm is a consultancy</p>
            <p>work with Fortune 50 fintech companies in NY</p>
            <p>always hiring</p>
          </Notes>
        </Slide>
        <Slide>
          <Text>When writing code, you should ask yourself a question:</Text>
        </Slide>
        <Slide>
          <Heading size={4}>Are you handling errors?</Heading>
          <Text>Or "just being safe?"</Text>
          <Notes>
            The difference being a level of deliberation and intent. Have you
            _planned_ for the error cases, or have you suppressed them?
          </Notes>
        </Slide>
        <Slide>
          <Heading size={4}>Why do I hate this?</Heading>
          <CodePane
            textSize="1.75rem"
            lang="javascript"
            source={`axios.get(url).then(({ data }) =>
 this.setState({ document: data.document || {} });
})`}
          />
          <Notes>
            The default value doesn't actually give you anything useful. At
            best, you've _moved_ the error, you haven't handled it.
          </Notes>
        </Slide>
        <Slide>
          <Heading size={4}>What about this?</Heading>
          <CodePane
            textSize="1.75rem"
            lang="javascript"
            source={`render() {
  const { document } = this.state;
  const title = document &&
    document.page &&
    document.page.heading &&
    document.page.heading.title;
  return <h1>{title}</h1>
}`}
          />
          <Notes>
            The chain of checks suppresses errors. If `document` isn't a usable
            value, what might it be? Perhaps... an empty object?
          </Notes>
        </Slide>
        <Slide>
          <Heading size={4}>If you don't have your data,</Heading>
          <Heading size={4}>can you actually continue?</Heading>
          <Text>Or are you just creating a different error later?</Text>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://codesandbox.io/s/01o0wq53zl"
          >
            sandbox demo
          </a>
        </Slide>
        <Slide>
          <Heading size={2}>You wouldn't drive a log</Heading>
          <Image src="https://i.imgur.com/OfA0Zqo.jpg" />
          <Notes>
            If you don't have everything you need to continue on, DON'T!!!
          </Notes>
        </Slide>
        <Slide>
          <Heading size={2}>Understand what is guaranteed</Heading>
        </Slide>
        <Slide>
          <Heading size={1}>External Data</Heading>
          <Heading size={6}>From your backend</Heading>
          <List>
            <ListItem>Figure out a shared contract</ListItem>
            <ListItem>
              Know who to yell at{" "}
              <Text textSize="1rem">jk respect your coworkers</Text>
            </ListItem>
            <ListItem>Bad deploys happen - surface them fast</ListItem>
          </List>
          <Notes>
            <p>
              A shared contract can be something as rigid and codified as a
              schema, or it could just be a shared understanding of what the
              response should be.
            </p>
            <p>
              Well designed applications will typically have a layer of
              abstraction for retrieving data. This layer is the perfect place
              to run validation against the incoming data–if you don't get what
              the app needs, erroring close to the source of it will help you
              hunt it down faster.
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1}>External Data</Heading>
          <Heading size={6}>From third-party APIs</Heading>
          <List>
            <ListItem>Not much you can do if they're flaky</ListItem>
            <ListItem>Strong error handling needed</ListItem>
          </List>
          <Notes>
            <p>
              If your team doesn't control the data, then there isn't much you
              can do to ensure it's reliable.
            </p>
            <p>
              Enforcing contracts is even more important if you don't trust the
              source of the data.
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1}>Internal Data</Heading>
          <Heading size={6}>Data passed through the application</Heading>
          <Text>You (and your team) control this 100%!!!</Text>
          <Text>
            If it's not trustworthy, then the fault lies on the code you've
            written.
          </Text>
          <Text>Validate quickly, log exceptions.</Text>
        </Slide>
        <Slide>
          <Heading size={1}>Internal Data</Heading>
          <Heading size={6}>Values from libraries</Heading>
          <Text>Many libraries will explicitly tell you what to expect.</Text>
          <Text textSize="1rem">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/axios/axios#response-schema"
            >
              Axios has a schema
            </a>
          </Text>
          <Text>
            A library that doesn't provide strong guarantees about the values it
            provides you is not a good library.
          </Text>
        </Slide>
        <Slide>
          <Heading size={4}>Costs of "just being safe"</Heading>
          <Text>Performance</Text>
          <Text>Cognitive load</Text>
          <Text>Downstream code</Text>
          <Notes>
            <p>
              If you're constantly checking that each key exists, the
              performance impact builds up over time. Conditionals aren't
              free–React's production mode removes prop types checks for this
              reason. Cutting the error handling has{" "}
              <a href="https://moduscreate.com/blog/react_component_rendering_performance/">
                React 2 to 8 times faster in production mode in some benchmarks.
              </a>
            </p>
            <p>
              Reading code that does these conditionals is more difficult, as
              well. It will slow you down a little bit every time you have to
              touch that code.
            </p>
            <p>
              Performing these checks without halting executing means that any
              code further down stream _also_ needs to run these checks. By
              simply suppressing errors when you have data that you can't
              actually render, you've infected all future code that is written
              against it.
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1}>Fixing the Problem</Heading>
          <List>
            <ListItem>What kinds of errors could happen? When?</ListItem>
            <ListItem>Are you handling the errors you can foresee?</ListItem>
            <ListItem>
              Will it error in production, or only in development?
            </ListItem>
            <ListItem>
              If you provide a default value, can it be used correctly?
            </ListItem>
          </List>
          <Notes>
            <p>
              If you don't have time to ask yourself these questions, are you
              sure you have time to deal with the bugs that pop up later?
            </p>
            <p>
              If your organization pushes you to ignore these and just ship,
              push back!! Skipping it makes your life harder.
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={4}>Fixing the problem</Heading>
          <Text>How could we improve this?</Text>
          <CodePane
            theme="light"
            lang="javascript"
            textSize="1.5rem"
            source={`class Thing extends React.Component {
  state = {
    document: undefined
  };
  componentDidMount() {
    axios.get(url).then(({ data }) =>
      this.setState({ document: data.document || {} });
    })
  }
  render() {
    const { document } = this.state;
    const title = document && document.page &&
      document.page.heading && document.page.heading.title;

    return <h1>{title}</h1>
  }
}`}
          />
        </Slide>
        <Slide>
          <Heading size={4}>Fixing the problem</Heading>
          <Text>Improved!</Text>
          <Layout>
            <Fill>
              <CodePane
                theme="light"
                lang="javascript"
                textSize="1.5rem"
                source={`class Thing extends React.Component {
  state = {
    document: undefined
  };

  componentDidMount() {
    apiLayer.getDataAndValidate()
      .then((document) =>
        this.setState({ document });
      })
  }

  render() {
    const { document } = this.state;
    return document
      ? <Page page={document.page} />
      : <div>Loading...</div>
  }
}
          `}
              />
            </Fill>
            <Fill>
              <CodePane
                theme="light"
                lang="javascript"
                textSize="1.5rem"
                source={`const Page = ({ page }) =>
  <h1>{page.heading.title}</h1>

const { shape, string } = PropTypes

Page.propTypes = {
  page: shape({
    heading: shape({
      title: string.isRequired
    }).isRequired
  }).isRequired
}
          `}
              />
            </Fill>
          </Layout>

          <Notes>
            <p>
              Separating data fetching from rendering would be a big
              improvement. It gives us a nice layer of abstraction where we
              could add additional validation in the form of type assertions, a
              data model, etc.
            </p>
            <p>
              On the component level, separating how we fetch or transform our
              data from how it gets rendered also makes a big difference, and
              gives us a place to add prop types.
            </p>
            <p>
              Simplifying prop values also goes a long way. Consider a `Heading`
              component: should it get our `page` object and retrieve
              `page.heading.title` itself, or should we just pass it a `title`
              prop?
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1} caps>
            Types!
          </Heading>
          <Notes>
            <p>
              Using Typescript or Flow will also help you catch errors like
              this, at least as far as data flowing within your application.
            </p>
            <p>
              I did talk to one developer who was using GraphQL to generate
              Typescript definitions for his client code: static verification
              that the backend and frontend are compatible!!!
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={1}>Data that varies</Heading>
          <Text>Sometimes external data varies.</Text>
          <Text>
            Know when to expect each format, and be explicit about handling all
            cases.
          </Text>
          <Notes>
            This could take the form of a schema (i.e., an agreed up on contract
            enforced by code), but a lot of the time it's a matter of
            communication and shared expectations.
          </Notes>
        </Slide>
        <Slide>
          <Text>You should be thinking about</Text>
          <Heading size={1} caps>
            Failure Modes
          </Heading>
          <Heading size={6}>FMEA – Failure Mode Effect Analysis</Heading>
          <Notes>
            <p>
              FMEA is a phase of design in safety-critical engineering where
              failure is either simulated or induced in order to evaluate its
              effect on the larger system.
            </p>
            <p>
              This is a practice we as software engineers could benefit from, if
              not because the organization mandates it, then because it will
              help us better understand our code.
            </p>
            <p>
              Learn more about what specific errors might come from code you're
              writing, or from a library you're using, or from the environment
              you're running in. Try to simulate some of those errors so you can
              learn what effects they have, and how you can handle them
              adequately.
            </p>
          </Notes>
        </Slide>
        <Slide>
          <Notes>This isn't strictly related, but holy shit is it cool.</Notes>
          <Layout>
            <Fill>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div style="position:relative;padding-bottom:54%">
                <iframe
                  src="https://gfycat.com/ifr/MadeupSelfassuredDeer"
                  frameborder="0"
                  scrolling="no"
                  width="100%"
                  height="100%"
                  style="position:absolute;top:0;left:0"
                />
              </div>`,
                }}
              />
            </Fill>
            <Fill>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div style="position:relative;padding-bottom:54%">
                <iframe
                  src="https://gfycat.com/ifr/MildEmbellishedDogwoodclubgall"
                  frameborder="0"
                  scrolling="no"
                  width="100%"
                  height="100%"
                  style="position:absolute;top:0;left:0"
                />
              </div>`,
                }}
              />
            </Fill>
          </Layout>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=6aoAuW6UtUM"
          >
            Original video
          </a>
        </Slide>
        <Slide>
          <Heading size={4}>
            "Just to be safe" is a hint that something is missing.
          </Heading>
          <Text>Ignoring these hints causes problems to accumulate.</Text>
          <Notes>
            When a developer does something “just to be safe,” it’s a hint that
            there’s an unrecognized unknown. Ignoring these hints can cause
            small problems to accumulate into large problems. Know what errors
            you want to see when making changes, how to guard against those you
            don’t, and learn to trust your code.
          </Notes>
        </Slide>
        <Slide>
          <Heading size={6}>Other reading</Heading>
          <List>
            <ListItem>
              <a href="https://medium.com/@cvitullo/overly-defensive-programming-e7a1b3d234c2">
                My original blog post
              </a>
            </ListItem>
            <ListItem>
              <a href="https://www.martinfowler.com/ieeeSoftware/failFast.pdf">
                ThoughtWorks "Fail Fast"
              </a>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={1}>Questions?</Heading>
        </Slide>
      </Deck>
    );
  }
}

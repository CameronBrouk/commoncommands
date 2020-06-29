# Write Semantic Fucking HTML, Retard

Cucks use the <div> element, are you a cuck?

## Semantic Elements

### section

Used for grouping together thematically-related content. Sounds like a div element, but it’s not. The div has no semantic meaning. Before replacing all your div’s with section elements, always ask yourself: “Is all of the content related?”

### aside

Used for tangentially related content. Just because some content appears to the left or right of the main content isn’t enough reason to use the aside element. Ask yourself if the content within the aside can be removed without reducing the meaning of the main content. Pullquotes are an example of tangentially related content.

### header

There is a crucial difference between the header element and the general accepted usage of header (or masthead). There’s usually only one header or ‘masthead’ in a page. In HTML5 you can have as many as you want. The spec defines it as “a group of introductory or navigational aids”. You can use a header in any section on your site. In fact, you probably should use a header within most of your sections. The spec describes the section element as “a thematic grouping of content, typically with a heading.”

### nav

Intended for major navigation information. A group of links grouped together isn’t enough reason to use the nav element. Site-wide navigation, on the other hand belongs in a nav element.

### footer

Sounds like its a description of the position, but its not. Footer elements contain informations about its containing element: who wrote it, copyright, links to related content, etc. Whereas we usually have one footer for an entire document, HTML5 allows us to also have footer within sections.

### article

Used for element that specifies independent, self-contained content. An article should make sense on its own. Before replacing all your div’s with article elements, always ask yourself: “Is it possible to read it independently from the rest of the web site?”

## The Fuck is the Difference between <article> and <section>?

- both can
- - be nested inside of each other
- - take a different notion in a different context
- <sections> are like book chapters
- - they usually have siblings(possibly in a different document)
- - together they have something in common, like chapters in a book
- one <article>, one author
- - example: blog comment
- - example: blog entry
- - a blog entry <article> and it's comment <article>
    uld be wrapped within an <article>
- <section> in an <article> are like chapters in a book
- <article>s in a <section> are like poems in a valume

## How the fuck do I use <header>, <footer>, and <main>?

- Use these to denote _information_, NOT position
- - <header>s give information that provides *important* context about a <section>
- - - example: title
- - - example: logo
- - <footer>s give information that provides *unimportant* context information
- - - example: credit the author of a section
- - - example: date an article was posted

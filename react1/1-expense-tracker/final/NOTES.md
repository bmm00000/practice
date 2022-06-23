RENDERING LISTS OF JSX ELEMENTS DYNAMICALLY, AND RENDERING CONDITIONAL CONTENT

react can render arrays of JSX elements:
{[<Card/>, <Card/>]}

when it comes to render lists of data, react wants to do it efficiently, without performance loses or bugs: if all items of the list look the same, by default, react adds the new item at the bottom of the list, and then updates the rest to recover the initial order, and this is not good regarding performance, and it can even lead to bugs (if the components of the list are stateful, then the updating can cause loss of state of existing components). to avoid all that, we need to tell react where the new item should be added. in order to do that, we use the special prop 'key' (one of the props that even custom components have by default; it also exists in built-in components). for react to know where the new item should be added, we need to identify it with a unique key (don't use the 'index' of the map callback as a key, even though you could, since the index is not attached to the content of the item, and you could run into bugs)

rendering conditional content: we can't add blocks (if statements, loops, etc.) inside the {} of the return block. We could use ternary expressions, but these could be long and difficult to read. Therefore, in order to render conditional content, we use either the '&&' syntax, or we put the JSX content inside of a variable before the return block (so we can use if statements, loops, etc.; this approach is better than the latter one, since the JSX snippet in the return block will be leaner), or use two return blocks (only if what the component returns changes completely).
RENDERING LISTS AND CONDITIONAL CONTENT, WORKING WITH DYNAMIC CONTENT

react can render arrays of JSX elements:
{[<Card/>, <Card/>]}

when it comes to render lists of data, react wants to do it efficiently, without performance loses or bugs: if all items of the list look the same, by default, react adds the new item at the bottom of the list, and then updates the rest to recover the initial order, and this is not good regarding performance, and it can even lead to bugs (if the components of the list are stateful, then the updating can cause loss of state). to avoid all that, we need to tell react where the new item should be added. in order to do that, we use the special prop 'key' (one of the props that even custom components have by default; it also exists in built-in components)

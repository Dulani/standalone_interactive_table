# Test Criteria Checklist for Issue #21

## Year Filter Tests
- [ ] Year slider has two handles that can be dragged
- [ ] Min year handle updates the min year display when dragged
- [ ] Max year handle updates the max year display when dragged
- [ ] Min handle cannot be dragged past the max handle
- [ ] Max handle cannot be dragged past the min handle
- [ ] Table data is filtered correctly when min year is changed
- [ ] Table data is filtered correctly when max year is changed
- [ ] Track between handles is highlighted correctly

## Law Class Filter Tests
- [ ] All law classes are initially selected/checked
- [ ] Unchecking a law class removes its rows from the table
- [ ] Checking a previously unchecked law class adds its rows back to the table
- [ ] Unchecking a parent law class unchecks all its subtypes
- [ ] Checking a parent law class checks all its subtypes
- [ ] Unchecking all subtypes of a law class shows the parent as indeterminate
- [ ] Table data is filtered correctly based on selected law classes and subtypes

## Combined Filter Tests
- [ ] Year and law class filters work together correctly
- [ ] Search filter works with year and law class filters
- [ ] Pagination works correctly with filtered data

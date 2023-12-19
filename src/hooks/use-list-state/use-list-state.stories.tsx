import { Button, Checkbox } from '@/components';
import { Box, LI, Stack, UL, Wrap } from '@/layouts';
import { randomId } from '@/utils';

import { useListState } from '.';

export default { title: 'Hooks/State Management/useListState' };

export function Usage() {
  const [
    state,
    { setState, append, apply, applyWhere, filter, insert, pop, prepend, remove, reorder, setItem, shift },
  ] = useListState<string>(['item 1', 'item 2']);
  return (
    <Stack gap="4">
      <UL>
        {state.map((item, index) => (
          <LI key={index}>{item}</LI>
        ))}
      </UL>
      <Wrap gap="4">
        <Button onClick={() => append('append item')}>Append</Button>
        <Button onClick={() => prepend('prepend item')}>Prepend</Button>
        <Button onClick={() => insert(0, 'insert item')}>Insert in 0th position</Button>
        <Button onClick={() => pop()}>pop</Button>
        <Button onClick={() => shift()}>shift</Button>
        <Button onClick={() => remove(0)}>remove</Button>
        <Button onClick={() => reorder({ from: 0, to: 1 })}>reorder</Button>
        <Button onClick={() => setItem(0, 'item')}>setItem</Button>
        <Button onClick={() => apply((item) => item + '1')}>apply</Button>
        <Button
          onClick={() =>
            applyWhere(
              (item) => item.length > 2,
              (item) => item + '1',
            )
          }
        >
          applyWhere
        </Button>
        <Button onClick={() => filter((item) => item.length > 2)}>filter</Button>
        <Button onClick={() => setState(['item'])}>setState</Button>
      </Wrap>
    </Stack>
  );
}

export function IndeterminateCheckbox() {
  const initialValues = [
    { label: 'Receive email notifications', checked: false, key: randomId() },
    { label: 'Receive sms notifications', checked: false, key: randomId() },
    { label: 'Receive push notifications', checked: false, key: randomId() },
  ];
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Box mt="3" key={value.key}>
      <Checkbox
        className="ml-4"
        label={value.label}
        checked={value.checked}
        onCheckedChange={(checked) => handlers.setItemProp(index, 'checked', checked)}
      />
    </Box>
  ));

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        onCheckedChange={() => {
          handlers.setState((current) => current.map((value) => ({ ...value, checked: !allChecked })));
        }}
      />
      {items}
    </>
  );
}

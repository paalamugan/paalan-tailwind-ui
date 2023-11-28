import * as React from 'react';

import type { IconProps } from '../components/Icon';

import { convertSvgIconToIcon } from '../components/Icon';
import { Input } from '../components/Input';
import { Grid, Heading, Text, VStack } from '../layouts';
import * as AllCustomIcons from './custom';
import * as AllOutlineIcons from './outline';
import * as AllSolidIcons from './solid';

export default {
  title: 'icons/Icons',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Hide the controls from the Canvas
    options: {
      showPanel: false, // Hide the controls panel
    },
  },
};

export function AllIcons() {
  interface IconRecord {
    title: string;
    entries: [string, React.FC<IconProps>][];
  }

  const allIconRecords = React.useMemo<IconRecord[]>(() => {
    const outlineIcons = Object.entries(AllOutlineIcons).map(([key, value]) => {
      return [key, convertSvgIconToIcon(value)] as [string, React.FC<IconProps>];
    });
    const solidIcons = Object.entries(AllSolidIcons).map(([key, value]) => {
      return [key, convertSvgIconToIcon(value)] as [string, React.FC<IconProps>];
    });
    const customIcons = Object.entries(AllCustomIcons);

    const records: IconRecord[] = [
      { title: 'Custom', entries: customIcons },
      { title: 'Outline', entries: outlineIcons },
      { title: 'Solid', entries: solidIcons },
    ];

    return records;
  }, []);

  const [filteredIconRecords, setFilteredIconRecords] = React.useState<IconRecord[]>(allIconRecords);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setFilteredIconRecords(allIconRecords);
    const filteredRecords = allIconRecords.map((record) => {
      const filteredEntries = record.entries.filter(([key]) => {
        return key.toLowerCase().includes(value.toLowerCase());
      });
      return {
        ...record,
        entries: filteredEntries,
      };
    });
    setFilteredIconRecords(filteredRecords);
  };
  return (
    <VStack gap="6">
      <Input placeholder="Search icon" onChange={onValueChange} />
      {filteredIconRecords.map((record) => (
        <React.Fragment key={record.title}>
          {!!record.entries.length && (
            <VStack mb="6">
              <Heading as="h2">{record.title} Icons</Heading>
              <Grid gap="8" className="grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
                {record.entries.map(([key, value]) => {
                  const IconComponent = value;

                  return (
                    <React.Fragment key={key}>
                      <VStack gap="3" alignItems="center" className="break-all text-center shadow" p="4">
                        <IconComponent className="h-6 w-6" />
                        <Text>{key}</Text>
                      </VStack>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </VStack>
          )}
        </React.Fragment>
      ))}
    </VStack>
  );
}

export function OutlineIcons() {
  const outlineIcons = Object.entries(AllOutlineIcons).map(([key, value]) => {
    return [key, convertSvgIconToIcon(value)] as [string, React.FC<IconProps>];
  });

  const [filteredIconRecords, setFilteredIconRecords] = React.useState(outlineIcons);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setFilteredIconRecords(outlineIcons);
    const filteredRecords = outlineIcons.filter(([key]) => {
      return key.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredIconRecords(filteredRecords);
  };
  return (
    <VStack gap="6">
      <Input placeholder="Search icon" onChange={onValueChange} />

      <VStack mb="6">
        <Heading as="h2">Outline Icons</Heading>
        <Grid gap="8" className="grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
          {filteredIconRecords.map(([key, value]) => {
            const IconComponent = value;

            return (
              <React.Fragment key={key}>
                <VStack gap="3" alignItems="center" className="break-all text-center shadow" p="4">
                  <IconComponent className="h-6 w-6" />
                  <Text>{key}</Text>
                </VStack>
              </React.Fragment>
            );
          })}
        </Grid>
      </VStack>
    </VStack>
  );
}

export function SolidIcons() {
  const outlineIcons = Object.entries(AllSolidIcons).map(([key, value]) => {
    return [key, convertSvgIconToIcon(value)] as [string, React.FC<IconProps>];
  });

  const [filteredIconRecords, setFilteredIconRecords] = React.useState(outlineIcons);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setFilteredIconRecords(outlineIcons);
    const filteredRecords = outlineIcons.filter(([key]) => {
      return key.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredIconRecords(filteredRecords);
  };
  return (
    <VStack gap="6">
      <Input placeholder="Search icon" onChange={onValueChange} />

      <VStack mb="6">
        <Heading as="h2">Solid Icons</Heading>
        <Grid gap="8" className="grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
          {filteredIconRecords.map(([key, value]) => {
            const IconComponent = value;

            return (
              <React.Fragment key={key}>
                <VStack gap="3" alignItems="center" className="break-all text-center shadow" p="4">
                  <IconComponent className="h-6 w-6" />
                  <Text>{key}</Text>
                </VStack>
              </React.Fragment>
            );
          })}
        </Grid>
      </VStack>
    </VStack>
  );
}

export function CustomIcons() {
  const customIcons = Object.entries(AllCustomIcons);

  const [filteredIconRecords, setFilteredIconRecords] = React.useState(customIcons);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setFilteredIconRecords(customIcons);
    const filteredRecords = customIcons.filter(([key]) => {
      return key.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredIconRecords(filteredRecords);
  };
  return (
    <VStack gap="6">
      <Input placeholder="Search icon" onChange={onValueChange} />

      <VStack mb="6">
        <Heading as="h2">Custom Icons</Heading>
        <Grid gap="8" className="grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
          {filteredIconRecords.map(([key, value]) => {
            const IconComponent = value;

            return (
              <React.Fragment key={key}>
                <VStack gap="3" alignItems="center" className="break-all text-center shadow" p="4">
                  <IconComponent boxSize="6" />
                  <Text>{key}</Text>
                </VStack>
              </React.Fragment>
            );
          })}
        </Grid>
      </VStack>
    </VStack>
  );
}

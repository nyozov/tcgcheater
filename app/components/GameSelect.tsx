"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import type { Key } from "@heroui/react";

import { ListBox, Select, Avatar, AvatarImage } from "@heroui/react";
import { tcgs } from "../tsgs";

export function GameSelect() {
  const params = useParams<{ slug?: string }>();

  const [game, setGame] = useState<Key | null>(params.slug ?? null);

  const router = useRouter();

  const handleSelect = (value: Key | Key[] | null) => {
    if (value == null || Array.isArray(value)) return;
    setGame(value);
    router.push(`/${value}`);
  };

  return (
    <Select
      className="w-[256px]"
      placeholder="Select one"
      value={game}
      onChange={handleSelect}
    >
      <Select.Trigger>
        <Select.Value>
          {({ defaultChildren, isPlaceholder, state }) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }
            const selectedItems = state.selectedItems;
            if (selectedItems.length > 1) {
              return `${selectedItems.length} users selected`;
            }
            const selectedItem = tcgs.find(
              (tcg) => tcg.slug === selectedItems[0]?.key,
            );
            if (!selectedItem) {
              return defaultChildren;
            }
            return (
              <div className="flex items-center gap-2">
                <Avatar className="size-4" size="sm">
                  <AvatarImage src={selectedItem.logo} />
                </Avatar>
                <span>{selectedItem.name}</span>
              </div>
            );
          }}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {tcgs.map((tcg) => (
            <ListBox.Item key={tcg.slug} id={tcg.slug} textValue={tcg.slug}>
              <Avatar size="sm">
                <AvatarImage src={tcg.logo} />
              </Avatar>
              <div className="flex flex-col">{tcg.name}</div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

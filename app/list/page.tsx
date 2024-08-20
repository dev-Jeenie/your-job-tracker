"use client";

import { useState } from "react";
import styles from "./list.module.css";
import { Box, Container, TextInput, Title } from "@mantine/core";

interface ListItem {
  text: string;
  category: string;
}

export default function ListPage() {
  const [list, setList] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Others']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filter, setFilter] = useState<string>('All');

  const addListItem = () => {
    if (inputValue.trim() && selectedCategory !== 'All') {
      setList([...list, { text: inputValue, category: selectedCategory }]);
      setInputValue('');
      setSelectedCategory('All');
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const filteredList = filter === 'All' ? list : list.filter(item => item.category === filter);

  return (
    <Container>
      <Box mt="xl">
        <Title>Add your JD Links</Title>
        <TextInput 
        label=""
        
        />
      </Box>
    </Container>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>채용공고를 등록하세요</h1>
      <h2>마감일자에 맞춰 알림을 보내드릴게요. 🍀</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
          placeholder="Enter an item"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="All" disabled>Select category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={addListItem} className={styles.addButton}>Add</button>
      </div>
      <div className={styles.categoryContainer}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className={styles.input}
          placeholder="New category"
        />
        <button onClick={addCategory} className={styles.addButton}>카테고리 추가</button>
      </div>
      <div className={styles.filterContainer}>
        <label htmlFor="filter" className={styles.filterLabel}>카테고리 필터</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.select}
        >
          <option value="All">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ul className={styles.list}>
        {filteredList.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item.text} <span className={styles.category}>[{item.category}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

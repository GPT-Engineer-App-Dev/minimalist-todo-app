import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo List</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button ml={2} colorScheme="blue" px={8} type="submit">Add</Button>
        </Flex>
        <List width="100%" spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex align="center" justify="space-between">
                <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
                <Box>
                  <IconButton icon={<FaCheckCircle />} onClick={() => toggleTaskCompletion(task.id)} aria-label="Complete task" m={1} />
                  <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} aria-label="Delete task" m={1} colorScheme="red" />
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
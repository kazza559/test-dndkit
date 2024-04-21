import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import './attachErrorHandler';

import { useCallback, useState } from 'react';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import Item from '../components/Item';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SortableItem from '../components/SortableItem';
import Grid from '../components/Grid';
import css from './App.module.less';
import { createPortal } from 'react-dom';

const App = () => {
	const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()));
	const [activeId, setActiveId] = useState(null);
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
		// Disable smooth scrolling in Cypress automated tests
		coordinateGetter:sortableKeyboardCoordinates,
		scrollBehavior: 'auto'
	}));

	const handleDragStart = useCallback((event) => {
		setActiveId(event.active.id);
	}, []);
	const handleDragEnd = useCallback((event) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	}, []);
	const handleDragCancel = useCallback(() => {
		setActiveId(null);
	}, []);

	return (
		<div className={css.container}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<SortableContext items={items} strategy={rectSortingStrategy}>
					<Grid >
						{items.map((id) => (
							<SortableItem key={id} id={id} />
						))}
					</Grid>
				</SortableContext>
				{<DragOverlay adjustScale >
					{activeId ? <Item id={activeId} isDragging /> : null}
				</DragOverlay>}
			</DndContext>
		</div>
	);
};

export default ThemeDecorator(App);

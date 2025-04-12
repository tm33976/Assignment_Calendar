
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeEventModal } from '@/redux/slices/uiSlice';
import { createEvent, updateEvent, deleteEvent } from '@/redux/slices/eventsSlice';
import { toast } from 'sonner';

const EventModal = () => {
  const dispatch = useAppDispatch();
  const { eventModal } = useAppSelector((state) => state.ui);
  const allEvents = useAppSelector((state) => state.events.events);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('work');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  
  // If editing an existing event, populate the form
  useEffect(() => {
    if (eventModal.mode === 'edit' && eventModal.eventId) {
      const eventToEdit = allEvents.find((event) => event._id === eventModal.eventId);
      
      if (eventToEdit) {
        setTitle(eventToEdit.title);
        setCategory(eventToEdit.category);
        
        const start = parseISO(eventToEdit.start);
        const end = parseISO(eventToEdit.end);
        
        setStartDate(format(start, 'yyyy-MM-dd'));
        setStartTime(format(start, 'HH:mm'));
        setEndDate(format(end, 'yyyy-MM-dd'));
        setEndTime(format(end, 'HH:mm'));
      }
    } else if (eventModal.initialData) {
      // For creating new events with pre-filled data (e.g., from dragging tasks)
      if (eventModal.initialData.title) {
        setTitle(eventModal.initialData.title);
      }
      
      if (eventModal.initialData.category) {
        setCategory(eventModal.initialData.category);
      }
      
      if (eventModal.initialData.start) {
        const start = parseISO(eventModal.initialData.start);
        setStartDate(format(start, 'yyyy-MM-dd'));
        setStartTime(format(start, 'HH:mm'));
      }
      
      if (eventModal.initialData.end) {
        const end = parseISO(eventModal.initialData.end);
        setEndDate(format(end, 'yyyy-MM-dd'));
        setEndTime(format(end, 'HH:mm'));
      }
    }
  }, [eventModal, allEvents]);
  
  const handleClose = () => {
    dispatch(closeEventModal());
    resetForm();
  };
  
  const resetForm = () => {
    setTitle('');
    setCategory('work');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
  };
  
  const handleSubmit = () => {
    if (!title || !category || !startDate || !startTime || !endDate || !endTime) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const startDateTime = `${startDate}T${startTime}:00`;
    const endDateTime = `${endDate}T${endTime}:00`;
    
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      toast.error('End time must be after start time');
      return;
    }
    
    const eventData = {
      title,
      category: category as any,
      start: startDateTime,
      end: endDateTime,
      goalId: eventModal.initialData?.goalId,
      taskId: eventModal.initialData?.taskId,
    };
    
    if (eventModal.mode === 'edit' && eventModal.eventId) {
      dispatch(updateEvent({ ...eventData, _id: eventModal.eventId }))
        .unwrap()
        .then(() => {
          toast.success('Event updated successfully');
          handleClose();
        })
        .catch((error) => {
          toast.error(`Failed to update event: ${error.message}`);
        });
    } else {
      dispatch(createEvent(eventData))
        .unwrap()
        .then(() => {
          toast.success('Event created successfully');
          handleClose();
        })
        .catch((error) => {
          toast.error(`Failed to create event: ${error.message}`);
        });
    }
  };
  
  const handleDelete = () => {
    if (eventModal.eventId) {
      dispatch(deleteEvent(eventModal.eventId))
        .unwrap()
        .then(() => {
          toast.success('Event deleted successfully');
          handleClose();
        })
        .catch((error) => {
          toast.error(`Failed to delete event: ${error.message}`);
        });
    }
  };
  
  return (
    <Dialog open={eventModal.isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {eventModal.mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Event title"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="eating">Eating</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="relax">Relax</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="social">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">Start Time</Label>
            <div className="col-span-3 flex gap-2">
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1"
              />
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">End Time</Label>
            <div className="col-span-3 flex gap-2">
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1"
              />
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-24"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <div>
            {eventModal.mode === 'edit' && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {eventModal.mode === 'create' ? 'Create Event' : 'Save Changes'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

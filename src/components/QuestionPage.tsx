import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Search, Plus, ThumbsUp, ThumbsDown, MessageCircle, Filter, TrendingUp, BookOpen, Bell, Sparkles, Flame, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { fetchQuestions, askQuestion } from '../api/questions';

export function QuestionPage({ user, onNavigate, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty: ''
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchQuestions();
        setQuestions(Array.isArray(data) ? data : data?.questions || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const mockQuestions = [
    {
      id: 1,
      title: 'How to solve differential equations with complex coefficients?',
      description: 'I am struggling with solving second-order differential equations that have complex coefficients. Can someone explain the general approach?',
      author: 'Priya Sharma',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=priya',
      college: 'IIT Delhi',
      tags: ['Mathematics', 'Engineering', 'Calculus'],
      upvotes: 23,
      downvotes: 2,
      answers: 5,
      views: 234,
      time: '2h ago',
      difficulty: 'Advanced',
      trending: true,
      hasAnswer: true
    },
    {
      id: 2,
      title: 'Best approach for organic chemistry nomenclature?',
      description: 'I keep getting confused with IUPAC naming for complex organic compounds. Any tips or resources?',
      author: 'Rahul Gupta',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=rahul',
      college: 'AIIMS',
      tags: ['Chemistry', 'Medical', 'NEET'],
      upvotes: 15,
      downvotes: 0,
      answers: 8,
      views: 156,
      time: '4h ago',
      difficulty: 'Beginner',
      hasAnswer: true
    },
    {
      id: 3,
      title: 'Implementing binary search trees efficiently',
      description: 'What are the best practices for implementing BSTs in competitive programming?',
      author: 'Ananya Patel',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=ananya',
      college: 'NIT Surathkal',
      tags: ['Computer Science', 'Data Structures', 'Algorithms'],
      upvotes: 31,
      downvotes: 1,
      answers: 12,
      views: 445,
      time: '6h ago',
      difficulty: 'Medium',
      hasAnswer: true
    },
    {
      id: 4,
      title: 'Understanding quantum mechanics wave functions',
      description: 'Can someone explain the physical significance of wave functions in quantum mechanics?',
      author: 'Vikram Singh',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=vikram',
      college: 'IISC Bangalore',
      tags: ['Physics', 'Quantum Mechanics', 'BSc'],
      upvotes: 19,
      downvotes: 3,
      answers: 0,
      views: 89,
      time: '1d ago',
      difficulty: 'Advanced',
      hasAnswer: false
    }
  ];

  const handleAskQuestion = async () => {
    try {
      const payload = {
        title: newQuestion.title,
        description: newQuestion.description,
        topic: newQuestion.topic,
        difficulty: newQuestion.difficulty,
      };
      await askQuestion(payload);
      setIsAskingQuestion(false);
      setNewQuestion({ title: '', description: '', topic: '', difficulty: '' });
      const refreshed = await fetchQuestions();
      setQuestions(Array.isArray(refreshed) ? refreshed : refreshed?.questions || []);
    } catch (e) {
      // swallow
    }
  };

  const handleQuestionClick = (questionId) => {
    onNavigate('question-detail', questionId);
  };

  const filteredQuestions = questions.filter((question: any) => {
    const titleMatch = (question.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const tags: string[] = question.tags || [];
    const tagMatch = tags.some(tag => (tag || '').toLowerCase().includes(searchQuery.toLowerCase()));
    return titleMatch || tagMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="hover-lift glass rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Questions & Answers
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 glass border-white/20 focus-elegant bg-white/60 rounded-xl"
                  />
                </div>
              </div>
              
              <Dialog open={isAskingQuestion} onOpenChange={setIsAskingQuestion}>
                <DialogTrigger asChild>
                  <Button className="btn-premium hover-glow shadow-elegant">
                    <Plus className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl glass border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-800">Ask a Question</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Question Title</Label>
                      <Input
                        placeholder="What's your question? Be specific..."
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                        className="glass border-white/20 focus-elegant bg-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Description</Label>
                      <Textarea
                        placeholder="Provide more details about your question..."
                        rows={4}
                        value={newQuestion.description}
                        onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                        className="glass border-white/20 focus-elegant bg-white/60"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium">Topic</Label>
                        <Select value={newQuestion.topic} onValueChange={(value) => setNewQuestion({...newQuestion, topic: value})}>
                          <SelectTrigger className="glass border-white/20 focus-elegant bg-white/60">
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium">Difficulty</Label>
                        <Select value={newQuestion.difficulty} onValueChange={(value) => setNewQuestion({...newQuestion, difficulty: value})}>
                          <SelectTrigger className="glass border-white/20 focus-elegant bg-white/60">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsAskingQuestion(false)} className="btn-glass hover-lift">
                        Cancel
                      </Button>
                      <Button onClick={handleAskQuestion} className="btn-premium hover-glow">
                        Post Question
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/20 shadow-elegant sticky top-24 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-800">
                  <Filter className="w-5 h-5 mr-2 text-purple-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Difficulty</Label>
                  <div className="mt-3 space-y-3">
                    {['Beginner', 'Medium', 'Advanced'].map((difficulty) => (
                      <label key={difficulty} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Status</Label>
                  <div className="mt-3 space-y-3">
                    {['Answered', 'Unanswered', 'Trending'].map((status) => (
                      <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Popular Tags</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'CS', 'Biology'].map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-500 hover:text-white transition-all hover-lift bg-white/60"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="glass border-white/20 bg-white/30 p-1">
                <TabsTrigger 
                  value="all"
                  className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant"
                >
                  All Questions
                </TabsTrigger>
                <TabsTrigger 
                  value="trending"
                  className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger 
                  value="unanswered"
                  className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant"
                >
                  Unanswered
                </TabsTrigger>
                <TabsTrigger 
                  value="recent"
                  className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-elegant"
                >
                  Recent
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                {loading && (
                  <Card className="glass border-white/20">
                    <CardContent className="p-6">Loading questions...</CardContent>
                  </Card>
                )}
                {error && (
                  <Card className="glass border-white/20">
                    <CardContent className="p-6 text-red-600">{error}</CardContent>
                  </Card>
                )}
                {!loading && !error && filteredQuestions.map((question, index) => (
                  <Card 
                    key={question._id || question.id || index} 
                    className="glass border-white/20 shadow-elegant hover:shadow-luxury transition-all hover-lift cursor-pointer group"
                    onClick={() => handleQuestionClick(question._id || question.id)}
                    style={{animationDelay: `${0.1 + index * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center space-y-2 min-w-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 hover:bg-green-100 hover:text-green-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </Button>
                          <span className="text-lg font-bold text-slate-700">{(question.upvotes || 0) - (question.downvotes || 0)}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 hover:bg-red-100 hover:text-red-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Stats Section */}
                        <div className="flex flex-col items-center space-y-4 min-w-0">
                          <div className="text-center glass rounded-xl p-3 bg-white/40">
                            <div className="text-lg font-bold text-emerald-600">{question.answers}</div>
                            <div className="text-xs text-slate-500">answers</div>
                          </div>
                          <div className="text-center glass rounded-xl p-3 bg-white/40">
                            <div className="text-lg font-bold text-blue-600">{question.views}</div>
                            <div className="text-xs text-slate-500">views</div>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                {question.trending && (
                                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-elegant">
                                    <Flame className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                <Badge variant="outline" className="border-slate-300">{question.difficulty || 'General'}</Badge>
                                {question.hasAnswer && (
                                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Answered
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-purple-600 transition-colors">
                                {question.title}
                              </h3>
                              <p className="text-slate-600 mb-4 line-clamp-2">
                                {question.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              {(question.tags || []).map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3 text-sm text-slate-500">
                                <Avatar className="w-8 h-8 ring-2 ring-white/50">
                                  <AvatarImage src={question.authorAvatar} />
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                                    {(question.author || 'U').charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-slate-700">{question.author || 'User'}</div>
                                  <div className="text-xs">{question.college || ''}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="trending">
                <div className="space-y-6 animate-fade-in-up">
                  {filteredQuestions.filter(q => q.trending).map((question, index) => (
                    <Card 
                      key={question.id} 
                      className="glass border-white/20 shadow-elegant hover:shadow-luxury transition-all hover-lift cursor-pointer"
                      onClick={() => handleQuestionClick(question.id)}
                      style={{animationDelay: `${0.1 + index * 0.1}s`}}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-elegant">
                            <Flame className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                          <Badge variant="outline">{question.difficulty}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{question.title}</h3>
                        <p className="text-slate-600 mb-4">{question.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-slate-100">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{question.upvotes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{question.answers}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{question.views}</span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="unanswered">
                <div className="space-y-6 animate-fade-in-up">
                  {filteredQuestions.filter(q => !q.hasAnswer).map((question, index) => (
                    <Card 
                      key={question.id} 
                      className="glass border-white/20 shadow-elegant hover:shadow-luxury transition-all hover-lift cursor-pointer"
                      onClick={() => handleQuestionClick(question.id)}
                      style={{animationDelay: `${0.1 + index * 0.1}s`}}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            Needs Answer
                          </Badge>
                          <Badge variant="outline">{question.difficulty}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{question.title}</h3>
                        <p className="text-slate-600 mb-4">{question.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-slate-100">{tag}</Badge>
                            ))}
                          </div>
                          <Button size="sm" className="btn-premium hover-glow">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Answer Question
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
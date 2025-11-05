import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Share, Bookmark, Edit, Flag, BookOpen, Sparkles, Star, CheckCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function QuestionDetailPage({ questionId, user, onNavigate, onLogout }) {
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState([
    {
      id: 1,
      content: `To solve differential equations with complex coefficients, you need to follow these key steps:

1. **Identify the type**: First determine if it's homogeneous or non-homogeneous
2. **Find characteristic equation**: For equations of the form ay'' + by' + cy = 0, the characteristic equation is ar² + br + c = 0
3. **Solve for complex roots**: When the discriminant b² - 4ac < 0, you'll get complex roots α ± βi
4. **General solution**: The solution will be e^(αx)(C₁cos(βx) + C₂sin(βx))

Here's a detailed example:
For y'' - 2y' + 5y = 0
- Characteristic equation: r² - 2r + 5 = 0
- Using quadratic formula: r = (2 ± √(4-20))/2 = 1 ± 2i
- So α = 1, β = 2
- General solution: y = e^x(C₁cos(2x) + C₂sin(2x))

Would you like me to work through a specific example you're having trouble with?`,
      author: 'Dr. Rajesh Kumar',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=rajesh',
      college: 'IIT Delhi',
      reputation: 2450,
      upvotes: 18,
      downvotes: 1,
      comments: 3,
      timePosted: '3 hours ago',
      isAccepted: true,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 2,
      content: `Another approach is to use Euler's method for complex exponentials. 

When you have complex roots α ± βi, remember that:
- e^(iβx) = cos(βx) + i·sin(βx)
- This gives you the real and imaginary parts of your solution

For computational purposes, you might also want to consider:
- Using software like MATLAB or Python's SciPy
- Numerical methods when analytical solutions are complex
- Phase portraits to visualize solution behavior

The key insight is that complex coefficients often lead to oscillatory solutions modulated by exponential growth or decay.`,
      author: 'Priya Sharma',
      authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=priya',
      college: 'IISC Bangalore',
      reputation: 1890,
      upvotes: 12,
      downvotes: 0,
      comments: 1,
      timePosted: '5 hours ago',
      isAccepted: false,
      isUpvoted: true,
      isDownvoted: false
    }
  ]);

  // Mock question data
  const question = {
    id: questionId,
    title: 'How to solve differential equations with complex coefficients?',
    description: `I am struggling with solving second-order differential equations that have complex coefficients. Specifically, I'm working on problems like:

y'' - 2y' + 5y = 0

When I use the characteristic equation method, I get complex roots, but I'm not sure how to interpret them to write the general solution. 

I understand the basics of differential equations with real coefficients, but the complex case is confusing me. Can someone explain:

1. How to handle complex roots in the characteristic equation?
2. What the general form of the solution looks like?
3. How to apply initial conditions with complex solutions?

Any worked examples would be greatly appreciated!`,
    author: 'Ananya Patel',
    authorAvatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=ananya',
    college: 'NIT Surathkal',
    tags: ['Mathematics', 'Differential Equations', 'Engineering', 'Complex Numbers'],
    upvotes: 23,
    downvotes: 2,
    views: 234,
    answers: answers.length,
    timePosted: '6 hours ago',
    difficulty: 'Advanced',
    isBookmarked: false,
    isUpvoted: false,
    isDownvoted: false
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) {
      toast.error('Please write your answer before submitting');
      return;
    }

    const answer = {
      id: answers.length + 1,
      content: newAnswer,
      author: user.name,
      authorAvatar: user.avatar,
      college: user.college,
      reputation: user.xp,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      timePosted: 'just now',
      isAccepted: false,
      isUpvoted: false,
      isDownvoted: false
    };

    setAnswers([...answers, answer]);
    setNewAnswer('');
    toast.success('Your answer has been posted!');
  };

  const handleVote = (answerId, voteType) => {
    setAnswers(answers.map(answer => {
      if (answer.id === answerId) {
        if (voteType === 'up') {
          return {
            ...answer,
            upvotes: answer.isUpvoted ? answer.upvotes - 1 : answer.upvotes + 1,
            downvotes: answer.isDownvoted ? answer.downvotes - 1 : answer.downvotes,
            isUpvoted: !answer.isUpvoted,
            isDownvoted: false
          };
        } else {
          return {
            ...answer,
            downvotes: answer.isDownvoted ? answer.downvotes - 1 : answer.downvotes + 1,
            upvotes: answer.isUpvoted ? answer.upvotes - 1 : answer.upvotes,
            isDownvoted: !answer.isDownvoted,
            isUpvoted: false
          };
        }
      }
      return answer;
    }));
  };

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
              <Button variant="ghost" size="icon" onClick={() => onNavigate('questions')} className="hover-lift glass rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Question Details
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="btn-glass hover-lift">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="btn-glass hover-lift">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Question Card */}
        <Card className="mb-8 glass border-white/20 shadow-elegant animate-fade-in-up">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-elegant">
                    {question.difficulty}
                  </Badge>
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/60 hover:bg-white/80 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold mb-6 text-slate-800">{question.title}</h1>
                <div className="prose max-w-none mb-6">
                  <p className="whitespace-pre-line text-slate-600 leading-relaxed">{question.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
              <div className="flex items-center space-x-8">
                {/* Vote buttons */}
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`hover-lift glass rounded-xl ${question.isUpvoted ? 'text-green-600 bg-green-50' : ''}`}
                  >
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    {question.upvotes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`hover-lift glass rounded-xl ${question.isDownvoted ? 'text-red-600 bg-red-50' : ''}`}
                  >
                    <ThumbsDown className="w-5 h-5 mr-2" />
                    {question.downvotes}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{question.answers} answers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{question.views} views</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10 ring-2 ring-white/50">
                  <AvatarImage src={question.authorAvatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {question.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-slate-800">{question.author}</div>
                  <div className="text-slate-500">{question.college} • {question.timePosted}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answers Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-purple-500" />
              {answers.length} Answers
            </h2>
            <div className="text-sm text-slate-500">
              Sorted by: Most upvoted
            </div>
          </div>

          {answers.map((answer, index) => (
            <Card 
              key={answer.id} 
              className={`glass border-white/20 shadow-elegant hover:shadow-luxury transition-all animate-fade-in-up ${
                answer.isAccepted ? 'ring-2 ring-green-200 bg-green-50/30' : ''
              }`}
              style={{animationDelay: `${0.2 + index * 0.1}s`}}
            >
              <CardContent className="p-8">
                {answer.isAccepted && (
                  <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-elegant">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accepted Answer
                  </Badge>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Vote Column */}
                  <div className="flex flex-col items-center space-y-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-12 w-12 hover-lift glass rounded-xl ${
                        answer.isUpvoted ? 'text-green-600 bg-green-50' : ''
                      }`}
                      onClick={() => handleVote(answer.id, 'up')}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <span className="text-xl font-bold text-slate-700">{answer.upvotes - answer.downvotes}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-12 w-12 hover-lift glass rounded-xl ${
                        answer.isDownvoted ? 'text-red-600 bg-red-50' : ''
                      }`}
                      onClick={() => handleVote(answer.id, 'down')}
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    <div className="prose max-w-none mb-6">
                      <p className="whitespace-pre-line text-slate-700 leading-relaxed">{answer.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="btn-glass hover-lift">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {answer.comments} comments
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                          <Flag className="w-4 h-4 mr-2" />
                          Report
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-slate-500 flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{answer.reputation} reputation</span>
                        </div>
                        <Avatar className="w-10 h-10 ring-2 ring-white/50">
                          <AvatarImage src={answer.authorAvatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {answer.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium text-slate-800">{answer.author}</div>
                          <div className="text-slate-500">{answer.college} • {answer.timePosted}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Answer Form */}
        <Card className="mt-12 glass border-white/20 shadow-elegant animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <Edit className="w-5 h-5 mr-3 text-purple-500" />
              Your Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Textarea
                placeholder="Share your knowledge! Write a detailed answer to help solve this question..."
                rows={10}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="min-h-[200px] glass border-white/20 focus-elegant bg-white/60"
              />
              <div className="flex items-start justify-between">
                <div className="text-sm text-slate-600 space-y-2">
                  <p className="font-medium">Tips for a great answer:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500">
                    <li>Provide step-by-step explanations</li>
                    <li>Include examples when possible</li>
                    <li>Cite reliable sources</li>
                    <li>Be respectful and helpful</li>
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="btn-glass hover-lift">
                    Preview
                  </Button>
                  <Button onClick={handleSubmitAnswer} className="btn-premium hover-glow shadow-elegant">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Post Answer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}